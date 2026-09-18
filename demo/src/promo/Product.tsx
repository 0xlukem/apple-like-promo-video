import { useMemo } from "react";
import {
  DataTexture,
  ExtrudeGeometry,
  RGBAFormat,
  Shape,
  SRGBColorSpace,
} from "three";
const makeBody = () => {
  const s = new Shape();
  const w = 1.78,
    h = 1.94,
    r = 0.25,
    x = -w / 2,
    y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  const g = new ExtrudeGeometry(s, {
    depth: 0.52,
    bevelEnabled: true,
    bevelSegments: 8,
    steps: 1,
    bevelSize: 0.055,
    bevelThickness: 0.065,
    curveSegments: 24,
  });
  g.translate(0, 0, -0.26);
  g.computeVertexNormals();
  return g;
};

const makeGrille = (flat: boolean) => {
  const n = 512,
    data = new Uint8Array(n * n * 4);
  for (let y = 0; y < n; y++)
    for (let x = 0; x < n; x++) {
      const dx = ((x + (Math.floor(y / 10) % 2) * 5) % 10) - 5,
        dy = (y % 10) - 5;
      const d = Math.hypot(dx, dy),
        hole = d < 2.9,
        edge = d < 3.8;
      const shade = hole ? 0.075 : edge ? 0.55 : 1;
      const p = (y * n + x) * 4;
      data[p] = Math.round((flat ? 170 : 248) * shade);
      data[p + 1] = Math.round((flat ? 170 : 104) * shade);
      data[p + 2] = Math.round((flat ? 170 : 27) * shade);
      data[p + 3] = 255;
    }
  const t = new DataTexture(data, n, n, RGBAFormat);
  t.colorSpace = SRGBColorSpace;
  t.needsUpdate = true;
  return t;
};

export const Product: React.FC<{
  flat?: boolean;
  rotation: [number, number, number];
  position: [number, number, number];
  scale: number;
}> = ({ flat = false, rotation, position, scale }) => {
  const body = useMemo(makeBody, []);
  const grille = useMemo(() => makeGrille(flat), [flat]);
  return (
    <group rotation={rotation} position={position} scale={scale}>
      <mesh geometry={body}>
        <meshPhysicalMaterial
          color={flat ? "#b0b0b0" : "#ef5917"}
          metalness={flat ? 0 : 0.62}
          roughness={flat ? 0.95 : 0.28}
          clearcoat={0.22}
        />
      </mesh>
      <mesh position={[0, 0, 0.35]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.806, 0.806, 0.05, 96]} />
        <meshStandardMaterial color="#26130b" metalness={0.4} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0, 0.381]}>
        <circleGeometry args={[0.775, 96]} />
        <meshStandardMaterial
          map={grille}
          color={flat ? "#888888" : "#ffffff"}
          metalness={flat ? 0 : 0.45}
          roughness={0.56}
        />
      </mesh>
      <mesh position={[0, 0, 0.383]}>
        <torusGeometry args={[0.795, 0.022, 12, 96]} />
        <meshStandardMaterial
          color={flat ? "#bdbdbd" : "#ff9149"}
          metalness={0.85}
          roughness={0.21}
        />
      </mesh>
      <mesh position={[0.958, 0.3, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.175, 0.175, 0.11, 64]} />
        <meshStandardMaterial
          color={flat ? "#adadad" : "#ff882e"}
          metalness={0.8}
          roughness={0.23}
        />
      </mesh>
      <mesh position={[1.017, 0.3, 0]} rotation={[0, Math.PI / 2, 0]}>
        <circleGeometry args={[0.136, 64]} />
        <meshStandardMaterial
          color={flat ? "#888888" : "#de561d"}
          metalness={0.7}
          roughness={0.35}
        />
      </mesh>
      <mesh position={[0, -0.58, -0.331]}>
        <boxGeometry args={[0.34, 0.055, 0.012]} />
        <meshStandardMaterial color="#27190f" roughness={0.7} />
      </mesh>

      {[-0.65, 0.65].flatMap((x) =>
        [-0.72, 0.72].map((y) => (
          <mesh
            key={`${x}-${y}`}
            position={[x, y, -0.331]}
            rotation={[0, Math.PI, 0]}
          >
            <circleGeometry args={[0.021, 16]} />
            <meshStandardMaterial
              color="#5c321d"
              metalness={0.6}
              roughness={0.4}
            />
          </mesh>
        )),
      )}
    </group>
  );
};
