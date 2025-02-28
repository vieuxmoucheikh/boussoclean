import { prisma } from './db';

export type Service = {
  id: string;
  nom: string;
  description: string;
  prix: number;
  unite: string | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export async function getAllServices(): Promise<Service[]> {
  try {
    const services = await prisma.service.findMany({
      orderBy: {
        nom: 'asc',
      },
    });
    
    return services;
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}

export async function getServiceById(id: string): Promise<Service | null> {
  try {
    const service = await prisma.service.findUnique({
      where: { id },
    });
    
    return service;
  } catch (error) {
    console.error(`Error fetching service with id ${id}:`, error);
    return null;
  }
}

export async function getServicesByIds(ids: string[]): Promise<Service[]> {
  try {
    const services = await prisma.service.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
    
    return services;
  } catch (error) {
    console.error('Error fetching services by ids:', error);
    return [];
  }
}
