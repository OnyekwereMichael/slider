"use server"

import { OutlineCard } from "@/lib/types";
import { onAuthenticateUser } from "./user"
import { prisma } from "@/lib/prisma"
import { JsonValue } from "@prisma/client/runtime/client";

export const getAllProjects = async () => {
    try {
        const checkUser = await onAuthenticateUser();
        if (checkUser.status !== 200 || !checkUser.user) {
            return { status: 403, message: "User Not Authenticated" }
        }

        const projects = await prisma.project.findMany({
            where: {
                userId: checkUser.user.id,
                isDeleted: false
            }, orderBy: {
                updatedAt: 'desc'
            }
        });

        if (projects.length === 0) {
            return { status: 400, error: "No Projects Found" }
        }

        return { status: 200, data: projects }
    } catch (error) {
        console.error(error);
        return { status: 500, message: "Internal Server Error" };
    }
}

export const getRecentProjects = async () => {
    try {
        const checkUser = await onAuthenticateUser();
        if (checkUser.status !== 200 || !checkUser.user) {
            return { status: 403, message: "User Not Authenticated" }
        }

        const projects = await prisma.project.findMany({
            where: {
                userId: checkUser.user.id,
                isDeleted: false
            }, orderBy: {
                updatedAt: 'desc'
            }, take: 5
        });

        if (projects.length === 0) {
            return { status: 400, error: "No Projects Found" }
        }

        return { status: 200, data: projects }
    } catch (error) {
        console.error(error);
        return { status: 500, message: "Internal Server Error" };
    }
}

export const recoverProject = async (projectId: string) => {
    try {
        const checkUser = await onAuthenticateUser();
        if (checkUser.status !== 200 || !checkUser.user) {
            return { status: 403, message: "User Not Authenticated" }
        }

        const project = await prisma.project.findUnique({
            where: {
                id: projectId,
                userId: checkUser.user.id,
                isDeleted: true
            }
        });

        if (!project) {
            return { status: 404, message: "Project not found" }
        }

        const updatedProject = await prisma.project.update({
            where: {
                id: projectId,
            },
            data: {
                isDeleted: false
            }
        });

        if (!updatedProject) {
            return { status: 500, message: "Failed to recover project" }
        }

        return { status: 200, data: updatedProject, message: "Project recovered successfully" }
    } catch (error) {
        console.error(error);
        return { status: 500, message: "Internal Server Error" };
    }
}

export const deleteProject = async (projectId: string) => {
    try {
        const checkUser = await onAuthenticateUser();
        if (checkUser.status !== 200 || !checkUser.user) {
            return { status: 403, message: "User Not Authenticated" }
        }

        const project = await prisma.project.findUnique({
            where: {
                id: projectId,
                userId: checkUser.user.id,
                isDeleted: false
            }
        });

        if (!project) {
            return { status: 404, message: "Project not found" }
        }

        const updatedProject = await prisma.project.update({
            where: {
                id: projectId,
            },
            data: {
                isDeleted: true
            }
        });

        if (!updatedProject) {
            return { status: 500, message: "Failed to delete project" }
        }

        return { status: 200, data: updatedProject, message: "Project deleted successfully" }
    } catch (error) {
        console.error(error);
        return { status: 500, message: "Internal Server Error" };
    }
}


export const createProject = async (title: string, outlines: OutlineCard[]) => {
    try {
        const checkUser = await onAuthenticateUser();
        if (checkUser.status !== 200 || !checkUser.user) {
            return { status: 403, message: "User Not Authenticated" }
        }

        if (!title) {
            return { status: 404, message: "Title is required" }
        }

        if (!outlines) {
            return { status: 404, message: "Outlines is required" }
        }

        const allOutlines = outlines.map((outline) => ({
            id: outline.id,
            title: outline.title,
            order: outline.order,
        }));

        const project = await prisma.project.create({
            data: {
                title,
                outlines: allOutlines.map((outline) => JSON.stringify(outline)),
                userId: checkUser.user.id,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        });

        if (!project) {
            return { status: 500, message: "Failed to create project" }
        }

        return { status: 200, data: project, message: "Project created successfully" }
    } catch (error) {
        console.error(error);
        return { status: 500, message: "Internal Server Error" };
    }
}

export const updateSlides = async (projectId: string, slides: JsonValue) => {
    try {
        if (!projectId || !slides) {
            return { status: 400, error: 'Project Id and slides are required' }
        }
        const updateProject = await prisma.project.update({
            where: {
                id: projectId,
            },
            data: {
                slides,
            },
        })

        if (!updateProject) {
            return { status: 500, error: 'Failed to update slides' }
        }

        return { status: 200, data: updateProject, message: 'Slides updated successfully' }
    } catch (error) {
        console.error(error);
        return { status: 500, message: "Internal Server Error" };
    }
}


export const getProjectById = async (projectId: string) => {
    try {
        const checkUser = await onAuthenticateUser();
        if (checkUser.status !== 200 || !checkUser.user) {
            return { status: 403, message: "User Not Authenticated" }
        }

        const project = await prisma.project.
            findFirst({
                where: {
                    id: projectId,
                }
            });

        if (!project) {
            return { status: 404, message: "Project not found" }
        }

        return { status: 200, data: project }
    } catch (error) {
        console.error(error);
        return { status: 500, message: "Internal Server Error" };
    }
}

export const updateTheme = async (projectId: string, theme: string) => {
    try {
        if (!projectId || !theme) {
            return { status: 400, error: 'Project ID and slides are required' }
        }

        const updatedProject = await prisma.project.update({
            where: {
                id: projectId,
            },
            data: {
                themeName: theme,
            },
        })

        if (!updatedProject) {
            return { status: 500, error: 'Failed to update theme' }
        }

        return { status: 200, data: updatedProject, message: 'Theme updated successfully' }
    } catch (error) {
        console.error(error);
        return { status: 500, message: "Internal Server Error" };
    }

}

export const deleteProjects = async (projectIds: string[]) => {
    try {
        const checkUser = await onAuthenticateUser();
        if (checkUser.status !== 200 || !checkUser.user) {
            return { status: 403, message: "User Not Authenticated" }
        }

        const deletedProjects = await prisma.project.deleteMany({
            where: {
                id: {
                    in: projectIds,
                },
                userId: checkUser.user.id,
            },
        });

        if (deletedProjects.count === 0) {
            return { status: 404, message: "Projects not found" }
        }

        return { status: 200, data: deletedProjects, message: "Projects deleted successfully" }
    } catch (error) {
        console.error(error);
        return { status: 500, message: "Internal Server Error" };
    }
}

export const getDeletedProjects = async () => {
    try {
        const checkUser = await onAuthenticateUser();
        if (checkUser.status !== 200 || !checkUser.user) {
            return { status: 403, message: "User Not Authenticated" }
        }

        const projects = await prisma.project.findMany({
            where: {
                userId: checkUser.user.id,
                isDeleted: true
            }, orderBy: {
                updatedAt: 'desc'
            }
        });

        if (projects.length === 0) {
            return { status: 400, error: "No Projects Found" }
        }

        return { status: 200, data: projects }
    } catch (error) {
        console.error(error);
        return { status: 500, message: "Internal Server Error" };
    }
}

export const restoreDeletedProjects = async () => {
    try {
        const checkUser = await onAuthenticateUser();
        if (checkUser.status !== 200 || !checkUser.user) {
            return { status: 403, message: "User Not Authenticated" }
        }

        const restoredProjects = await prisma.project.updateMany({
            where: {
                userId: checkUser.user.id,
                isDeleted: true
            },
            data: {
                isDeleted: false,
            }
        });

        if (restoredProjects.count === 0) {
            return { status: 404, message: "Projects not found" }
        }

        return { status: 200, data: restoredProjects, message: "Projects restored successfully" }
    } catch (error) {
        console.error(error);
        return { status: 500, message: "Internal Server Error" };
    }
}