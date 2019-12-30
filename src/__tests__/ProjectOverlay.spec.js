import React from 'react';
import { render, cleanup, fireEvent } from "@testing-library/react";
import { ProjectOverlay } from "../components/ProjectOverlay"
import { useProjectsValue } from "../context";

beforeEach(cleanup);

jest.mock('../context', () => ({
    useProjectsValue: jest.fn(() => ({
        projects: [
            {
                name: '🎅2nd Project',
                projectid: '3',
                userid: '112233',
            }
        ]
    }))
}))

describe('<ProjectOverlay>', () => {
    afterEach(() => {
        jest.clearAllMocks();
    })
    describe('Success', () => {
        it('renders the project overlay and calls setShowProjectOverlay using onClick', () => {
            const showProjectOverlay = true;
            const setProject = jest.fn()
            const setShowProjectOverlay = jest.fn(() => !showProjectOverlay)
            const { queryByTestId } = render(
                <ProjectOverlay setProject={setProject}
                    showProjectOverlay
                    setShowProjectOverlay={setShowProjectOverlay}
                />
            )
            expect(queryByTestId('project-overlay')).toBeTruthy();
            fireEvent.click(queryByTestId('project-overlay-action'));
            expect(setProject).toHaveBeenCalled();

        });
        it('renders the project overlay and calls setShowProjectOverlay using onKeyDown', () => {
            const showProjectOverlay = true;
            const setProject = jest.fn()
            const setShowProjectOverlay = jest.fn(() => !showProjectOverlay)

            const { queryByTestId } = render(
                <ProjectOverlay setProject={setProject}
                    showProjectOverlay
                    setShowProjectOverlay={setShowProjectOverlay}
                />
            )
            expect(queryByTestId('project-overlay')).toBeTruthy();
            fireEvent.keyDown(queryByTestId('project-overlay-action'));
            expect(setProject).toHaveBeenCalled();

        });

    });

    describe('Failure', () => {
        it('doesnot render the project overlay with any projects', () => {
            useProjectsValue.mockImplementation(() => ({
                projects: [],
            }))
            const { queryByTestId } = render(<ProjectOverlay showProjectOverlay />)
            expect(queryByTestId('project-overlay')).toBeTruthy()
            expect(queryByTestId('project-overlay-action')).toBeFalsy()
        });

    });
});

