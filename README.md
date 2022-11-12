# Blocks Rendering Engine (BRE)

## Entities

### Side

The side is the definition of one of the sides of the block.
There are 6 sides:

- Front.
- Top.
- Right.
- Left.
- Bottom.
- Back.

Each side has next props (to be extended):

- _Background_ defines color of the side.
- _Border_ defines color (default is **black**), thickness (default is **1**), style (default is **solid**), and units (default is **px**).
- _Size_ is width and height of the side.
- _Transform_ defines position of the side in the block.

These props can be defined for the side individually or taken from the block props.

### Block

The block is a single unit with 6 sides.

Each block has next props (to be extended):

- _Background_ defines color of the block. *
- _Border_ defines color (default is **black**), thickness (default is **1**), style (default is **solid**), and units (default is **px**). *
- _Grid_ is the util which contains global data such as units, grid size, etc. and is able to translate relative points to absolute.
- _Point_ is the relative coordinates of the center of the block.
- _Sides_ are the definitions for each side.
- _Transform_ is the util which can generate strings for CSS definitions such as __rotateX__, __translateZ__, etc.

__\*__ It can be overridden by settings of the side.

### Plane

The plane is the wrapper and helper entity for the set of blocks. It renders blocks and  makes it easier to perform various mass operations such as: scene rotation and movement.

It is possible to define several planes.

Each plane has next props (to be extended):

- _Background_ defines color of the plane.
- _Block script_ defines set of blocks to be rendered.
- _Border_ defines color (default is **black**), thickness (default is **1**), style (default is **solid**), and units (default is **px**) of the plane.
- _Grid_ is the util which contains global data such as units, grid size, etc. and is able to translate relative points to absolute.
- _Rotate_ defines plane rotation.
- _Translate_ defines plane's position.
- _Wrapper width_ is the width of the container.
- _Wrapper height_ is the height of the container.

## Coordinates

The BRE uses a relative 3D coordinates system with starting point at the center of the space.
