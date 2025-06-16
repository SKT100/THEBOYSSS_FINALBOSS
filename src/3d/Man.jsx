import React, { useEffect, useMemo, useRef, useState, forwardRef } from 'react';
import { useGLTF, useAnimations, useKeyboardControls } from '@react-three/drei';
import { SkeletonUtils } from 'three-stdlib';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three'; // <-- Semicolon added here
import { Controls } from '../controls.js';
import { socket } from './SocketManager';

// Adjust speeds
const WALK_SPEED = 2.5; // units per second
const RUN_SPEED = 4.5; // units per second

// Throttle interval for sending position updates (e.g., send every 50ms)
const POSITION_UPDATE_INTERVAL_MS = 50; // milliseconds

// Boundary Limits (adjust these if your classroom or plane dimensions change)
const BOUNDARY_MIN_X = -31.5;
const BOUNDARY_MAX_X = 33.5;
const BOUNDARY_MIN_Z = -35;
const BOUNDARY_MAX_Z = 57;

const Man = forwardRef(({ initialPosition, targetPosition, id, localSocketId }, ref) => {
  const internalGroupRef = useRef();
  const group = ref || internalGroupRef;

  const { scene, animations } = useGLTF('/models/Man.glb');
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { actions, mixer } = useAnimations(animations, group);

  const [currentAnimation, setCurrentAnimation] = useState('HumanArmature|Man_Idle');
  const [currentClientPosition] = useState(() => new THREE.Vector3(...initialPosition));
  const [velocity] = useState(() => new THREE.Vector3());

  const [subscribe, getKeys] = useKeyboardControls();
  const [oneShotPlaying, setOneShotPlaying] = useState(null);

  const tempEuler = useMemo(() => new THREE.Euler(0, 0, 0, 'YXZ'), []);
  const tempDirection = useMemo(() => new THREE.Vector3(), []); // This was unused, but keeping it as it was in your original code

  const lastPositionUpdateTime = useRef(0);

  useEffect(() => {
    if (id !== localSocketId && targetPosition) {
      currentClientPosition.set(...targetPosition);
    }
  }, [targetPosition, id, localSocketId, currentClientPosition]);

  useEffect(() => {
    if (oneShotPlaying) {
      return;
    }
    if (!actions || !actions[currentAnimation]) {
      console.warn(Animation, "${currentAnimation}", not ,found);
      return;
    }

    const currentAction = actions[currentAnimation];
    currentAction.reset().fadeIn(0.32).play();

    return () => {
      currentAction?.fadeOut(0.32);
    };
  }, [actions, currentAnimation, oneShotPlaying]);

  useEffect(() => {
    if (!localSocketId || id !== localSocketId) {
      return;
    }

    const playOneShotAnimation = (animName, loopType = THREE.LoopOnce) => {
      if (actions[animName] && !oneShotPlaying) {
        setOneShotPlaying(animName);
        const action = actions[animName];
        action.reset()
              .setLoop(loopType, 1)
              .clampWhenFinished = true;
        action.fadeIn(0.1).play();

        const onFinish = (e) => {
          if (e.action === action) {
            action.fadeOut(0.1);
            setOneShotPlaying(null);
            mixer.removeEventListener('finished', onFinish);

            const { forward, backward, left, right, run } = getKeys();
            const moving = forward || backward || left || right;
            if (moving) {
                setCurrentAnimation(run ? 'HumanArmature|Man_Run' : 'HumanArmature|Man_Walk');
            } else {
                setCurrentAnimation('HumanArmature|Man_Idle');
            }
          }
        };
        mixer.addEventListener('finished', onFinish);
      }
    };

    const unsub = subscribe(
        (state) => ({
            forward: state[Controls.forward],
            backward: state[Controls.backward],
            left: state[Controls.left],
            right: state[Controls.right],
            run: state[Controls.run],
            jump: state[Controls.jump],
            clap: state[Controls.clap],
            sit: state[Controls.sit],
            punch: state[Controls.punch],
            standUp: state[Controls.standUp],
        }),
        (state) => {
            const { forward, backward, left, right, run, jump, clap, sit, punch, standUp } = state;
            const moving = forward || backward || left || right;

            if (jump && !oneShotPlaying) {
                playOneShotAnimation('HumanArmature|Man_Jump');
            } else if (clap && !oneShotPlaying) {
                playOneShotAnimation('HumanArmature|Man_Clapping');
            } else if (sit) {
                if (currentAnimation !== 'HumanArmature|Man_Sitting') {
                    setCurrentAnimation('HumanArmature|Man_Sitting');
                }
            } else if (punch && !oneShotPlaying) {
                playOneShotAnimation('HumanArmature|Man_Punch');
            } else if (standUp && currentAnimation !== 'HumanArmature|Man_Idle') {
                setCurrentAnimation('HumanArmature|Man_Idle');
            }
            else if (!oneShotPlaying) {
                if (currentAnimation === 'HumanArmature|Man_Sitting') {
                    if (moving) {
                        setCurrentAnimation('HumanArmature|Man_Idle');
                    } else {
                        return;
                    }
                }

                if (moving) {
                    if (run && currentAnimation !== 'HumanArmature|Man_Run') {
                        setCurrentAnimation('HumanArmature|Man_Run');
                    } else if (!run && currentAnimation !== 'HumanArmature|Man_Walk') {
                        setCurrentAnimation('HumanArmature|Man_Walk');
                    }
                } else {
                    if (currentAnimation !== 'HumanArmature|Man_Idle') {
                        setCurrentAnimation('HumanArmature|Man_Idle');
                    }
                }
            }
        }
    );
    return () => unsub();
  }, [actions, mixer, currentAnimation, oneShotPlaying, id, localSocketId, getKeys, subscribe]);

  useFrame((state, delta) => {
    if (!group.current) return;

    if (id === localSocketId) {
      const { forward, backward, left, right, run } = getKeys();

      const currentSpeed = run ? RUN_SPEED : WALK_SPEED;
      velocity.set(0, 0, 0);

      if (forward) velocity.z -= 1;
      if (backward) velocity.z += 1;
      if (left) velocity.x -= 1;
      if (right) velocity.x += 1;

      if (velocity.lengthSq() > 0 && currentAnimation !== 'HumanArmature|Man_Sitting') {
        velocity.normalize();

        const camera = state.camera;
        tempEuler.setFromQuaternion(camera.quaternion);
        tempEuler.x = 0;
        tempEuler.z = 0;

        velocity.applyEuler(tempEuler);

        group.current.position.addScaledVector(velocity, currentSpeed * delta);
        group.current.lookAt(group.current.position.clone().add(velocity));

        if (!oneShotPlaying) {
            if (run && currentAnimation !== 'HumanArmature|Man_Run') {
                setCurrentAnimation('HumanArmature|Man_Run');
            } else if (!run && currentAnimation !== 'HumanArmature|Man_Walk') {
                setCurrentAnimation('HumanArmature|Man_Walk');
            }
        }

        // Boundary Clamping
        group.current.position.x = Math.max(BOUNDARY_MIN_X, Math.min(BOUNDARY_MAX_X, group.current.position.x));
        group.current.position.z = Math.max(BOUNDARY_MIN_Z, Math.min(BOUNDARY_MAX_Z, group.current.position.z));

        const currentTime = performance.now();
        if (currentTime - lastPositionUpdateTime.current > POSITION_UPDATE_INTERVAL_MS) {
            if (socket.connected) {
                socket.emit("move", {
                    id: localSocketId,
                    position: [group.current.position.x, group.current.position.y, group.current.position.z],
                });
            }
            lastPositionUpdateTime.current = currentTime;
        }

      } else {
        if (!oneShotPlaying && currentAnimation !== 'HumanArmature|Man_Idle' && currentAnimation !== 'HumanArmature|Man_Sitting') {
            setCurrentAnimation('HumanArmature|Man_Idle');
        }
      }

    }
    // Other players movement & animation logic
    else {
        const distanceToTarget = group.current.position.distanceTo(currentClientPosition);
        if (distanceToTarget > 0.1) {
            group.current.position.lerp(currentClientPosition, 0.1);

            const direction = currentClientPosition.clone().sub(group.current.position).normalize();
            group.current.lookAt(group.current.position.clone().add(direction));

            if (currentAnimation !== 'HumanArmature|Man_Walk' && currentAnimation !== 'HumanArmature|Man_Run' && currentAnimation !== 'HumanArmature|Man_Sitting') {
                setCurrentAnimation('HumanArmature|Man_Walk');
            }
        } else {
            group.current.position.copy(currentClientPosition);
            if (currentAnimation !== 'HumanArmature|Man_Idle' && currentAnimation !== 'HumanArmature|Man_Sitting') {
                setCurrentAnimation('HumanArmature|Man_Idle');
            }
        }
    }
  });

  return (
    <group
      ref={group}
      object={clone}
      scale={[1.5, 1.5, 1.5]}
      position={currentClientPosition}
    />
  );
});

export default Man;

useGLTF.preload('/models/Man.glb');