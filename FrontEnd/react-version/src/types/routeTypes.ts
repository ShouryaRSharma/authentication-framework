import { RouteComponentProps } from 'react-router-dom';

export interface RouteProps {
    location?: RouteComponentProps["location"],
    history?: RouteComponentProps["history"],
    match?: RouteComponentProps["match"],
}