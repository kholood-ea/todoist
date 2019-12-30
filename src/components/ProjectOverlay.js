import React from 'react';
import { useProjectsValue } from "../context";

export const ProjectOverlay = ({
    setProject,
    showProjectOverlay,
    setShowProjectOverlay }) => {
    const { projects } = useProjectsValue()
    return (
        projects && showProjectOverlay && (
            <div className="project-overlay" data-testid="project-overlay">
                <ul className="project-overlay__list">
                    {projects.map(project => (
                        <li key={project.projectid}
                        >
                            <div
                                data-testid="project-overlay-action"
                                onClick={() => {
                                    setProject(project.projectid);
                                    setShowProjectOverlay(false)
                                }}
                                onKeyDown={() => {
                                    setProject(project.projectid);
                                    setShowProjectOverlay(false)
                                }}
                                role="button"
                                tabIndex={0}
                                aria-label="Select the task project"

                            >
                                {project.name}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    )

}
