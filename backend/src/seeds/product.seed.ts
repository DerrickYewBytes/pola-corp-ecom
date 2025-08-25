import { Product } from '../core/models/product.entity';

export const sampleProducts: Partial<Product>[] = [
  {
    name: 'DJI F450 Frame Kit',
    description:
      'High-quality carbon fiber frame kit for DIY drone builds. Includes all mounting hardware and landing gear.',
    price: 89.99,
    category: 'Frames',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    specifications: {
      material: 'Carbon Fiber',
      size: '450mm',
      weight: '280g',
      maxPayload: '1.2kg',
    },
    stockQuantity: 15,
    sku: 'DJI-F450-KIT',
    weight: 280,
    dimensions: {
      length: 450,
      width: 450,
      height: 50,
    },
  },
  {
    name: 'T-Motor MN3110 KV470 Motor',
    description:
      'Professional-grade brushless motor with high efficiency and smooth operation. Perfect for aerial photography drones.',
    price: 45.99,
    category: 'Motors',
    imageUrl:
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400',
    specifications: {
      kv: 470,
      maxCurrent: '15A',
      maxPower: '200W',
      weight: '85g',
    },
    stockQuantity: 25,
    sku: 'TM-MN3110-470',
    weight: 85,
    dimensions: {
      length: 35,
      width: 35,
      height: 25,
    },
  },
  {
    name: 'Gemfan 1045 Carbon Fiber Propellers',
    description:
      'High-performance carbon fiber propellers with excellent thrust and efficiency. Set of 4 propellers.',
    price: 32.99,
    category: 'Propellers',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    specifications: {
      diameter: '10 inches',
      pitch: '4.5 inches',
      material: 'Carbon Fiber',
      blades: 2,
    },
    stockQuantity: 40,
    sku: 'GF-1045-CF',
    weight: 15,
    dimensions: {
      length: 254,
      width: 254,
      height: 5,
    },
  },
  {
    name: 'Pixhawk 4 Flight Controller',
    description:
      'Advanced autopilot system with GPS, compass, and barometer. Supports autonomous flight modes.',
    price: 199.99,
    category: 'Flight Controllers',
    imageUrl:
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400',
    specifications: {
      processor: 'STM32F765',
      sensors: 'GPS, Compass, Barometer, IMU',
      maxVoltage: '6V',
      weight: '15.8g',
    },
    stockQuantity: 8,
    sku: 'PX4-PIXHAWK4',
    weight: 15.8,
    dimensions: {
      length: 81,
      width: 50,
      height: 15,
    },
  },
  {
    name: 'Turnigy 5000mAh 4S LiPo Battery',
    description:
      'High-capacity lithium polymer battery with high discharge rate. Perfect for long flight times.',
    price: 89.99,
    category: 'Batteries',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    specifications: {
      capacity: '5000mAh',
      voltage: '14.8V (4S)',
      dischargeRate: '30C',
      weight: '450g',
    },
    stockQuantity: 12,
    sku: 'TGY-5000-4S',
    weight: 450,
    dimensions: {
      length: 140,
      width: 45,
      height: 25,
    },
  },
  {
    name: 'FrSky X8R Receiver',
    description:
      '8-channel telemetry receiver with SBUS output. Compatible with FrSky transmitters.',
    price: 34.99,
    category: 'Receivers',
    imageUrl:
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400',
    specifications: {
      channels: 8,
      protocol: 'ACCST',
      range: '1.5km',
      weight: '16g',
    },
    stockQuantity: 20,
    sku: 'FRS-X8R',
    weight: 16,
    dimensions: {
      length: 45,
      width: 25,
      height: 10,
    },
  },
  {
    name: 'GoPro Hero 10 Camera Mount',
    description:
      'Universal camera mount with vibration dampening. Compatible with most drone frames.',
    price: 24.99,
    category: 'Accessories',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    specifications: {
      material: 'Aluminum',
      weight: '45g',
      compatibility: 'Universal',
      dampening: 'Yes',
    },
    stockQuantity: 30,
    sku: 'GP-MOUNT-UNI',
    weight: 45,
    dimensions: {
      length: 60,
      width: 40,
      height: 20,
    },
  },
  {
    name: 'LED Strip Kit (RGB)',
    description:
      'Programmable RGB LED strip for drone lighting. Includes controller and mounting hardware.',
    price: 18.99,
    category: 'Accessories',
    imageUrl:
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400',
    specifications: {
      leds: '30 per meter',
      voltage: '12V',
      waterproof: 'Yes',
      controller: 'Included',
    },
    stockQuantity: 50,
    sku: 'LED-RGB-STRIP',
    weight: 25,
    dimensions: {
      length: 100,
      width: 10,
      height: 3,
    },
  },
];
