'use client'

import { Project } from '@/lib/generated/prisma'
import React from 'react'
import { motion } from 'framer-motion'
import { containerVariants } from '@/lib/constants'
import ProjectCard from '../project-card'

const Projects = ({ projects }: { projects: Project[] }) => {
    return (
        <motion.div
            className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'
            variants={containerVariants}
            initial='hidden'
            animate='visible'
        >
            {projects.map((project) => (
                <ProjectCard
                    key={project.id}
                    projectId={project.id}
                    src={project.thumbnail}
                    title={project.title}
                    createdAt={project.createdAt}
                    isDelete={project?.isDeleted}
                    slideData={project?.slides}
                    themeName={project.themeName}
                />
            ))}
        </motion.div>
    )
}

export default Projects