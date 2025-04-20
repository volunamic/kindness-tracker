"use client"

// This file contains different flower/shape SVG paths for the kindness tracker

export interface ShapeDefinition {
  id: string;
  name: string;
  svgPath: string;
  centerX: number;
  centerY: number;
  centerRadius: number;
  transform?: string;
}

// Collection of different shapes for the kindness tracker
export const shapes: ShapeDefinition[] = [
  {
    id: "flower",
    name: "Flower",
    svgPath: `M50,20
      C55,10 65,10 70,20
      C75,10 85,15 85,25
      C95,25 95,35 85,40
      C95,45 90,55 80,55
      C85,65 75,70 70,60
      C65,70 55,70 50,60
      C45,70 35,70 30,60
      C25,70 15,65 20,55
      C10,55 5,45 15,40
      C5,35 5,25 15,25
      C15,15 25,10 30,20
      C35,10 45,10 50,20 Z`,
    centerX: 50,
    centerY: 40,
    centerRadius: 12
  },
  {
    id: "honeycomb",
    name: "Honeycomb",
    svgPath: `M25,13.4
      L75,13.4
      L95,50
      L75,86.6
      L25,86.6
      L5,50 Z`,
    centerX: 50,
    centerY: 50,
    centerRadius: 15
  },
  {
    id: "heart",
    name: "Heart",
    svgPath: `M50,20
      C35,5 10,20 10,40
      C10,65 35,80 50,90
      C65,80 90,65 90,40
      C90,20 65,5 50,20 Z`,
    centerX: 50,
    centerY: 55,
    centerRadius: 10
  },
  {
    id: "star",
    name: "Star",
    svgPath: `M50,10
      L61.8,35.1
      L90,38.2
      L70,57.3
      L74.6,85
      L50,72
      L25.4,85
      L30,57.3
      L10,38.2
      L38.2,35.1 Z`,
    centerX: 50,
    centerY: 50,
    centerRadius: 10
  },
  {
    "id": "butterfly",
    "name": "Butterfly",
    "svgPath": "M50,70 C65,90 85,85 85,70 C85,55 65,50 50,50 C65,50 85,45 85,30 C85,15 65,10 50,30 M50,70 C35,90 15,85 15,70 C15,55 35,50 50,50 C35,50 15,45 15,30 C15,15 35,10 50,30",
    "centerX": 50,
    "centerY": 50,
    "centerRadius": 8,
}
];

// Get the next shape in the collection (cycles back to first when at the end)
export function getNextShape(currentShapeId: string): ShapeDefinition {
  const currentIndex = shapes.findIndex(shape => shape.id === currentShapeId);
  const nextIndex = (currentIndex + 1) % shapes.length;
  return shapes[nextIndex];
}

// Get a shape by ID
export function getShapeById(shapeId: string): ShapeDefinition {
  return shapes.find(shape => shape.id === shapeId) || shapes[0];
}
