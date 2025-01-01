

const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Part = ({ part }) =>
    <p>
        {part.name} {part.exercises}
    </p>

const Content = ({ parts }) =>
{
    return (
        parts.map(part =>
            <Part
                key={part.id}
                part={part}
            />
        )

    )
}

const Course = ({ course }) => {
    const { name, parts } = course
    const sum = parts.reduce((acc, part) => acc + part.exercises, 0)

    return (
        <>
            <Header course={name} />
            <Content parts={parts} />
            <Total sum={sum} />
        </>
    )

}

export default Course;
