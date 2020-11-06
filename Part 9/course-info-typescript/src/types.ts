export interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

export interface CoursePartOne extends CoursePartBase {
  name: "Fundamentals";
  description: string;
}

export interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

export interface CoursePartThree extends CoursePartBase {
  name: "Deeper type usage";
  description: string;
  exerciseSubmissionLink: string;
}

export interface CoursePartFour extends CoursePartBase {
  name: "Extra part";
  description: string;
  info: string;
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;

export interface ContentProps {
  courseParts: CoursePart[];
}

export interface HeaderProps {
  courseName: string;
}