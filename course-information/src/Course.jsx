const Course = ({ course }) => {
  const Header = ({ course }) => <h1>{course.name}</h1>

  const Part = ({ name, exercises }) => {
    return (
      <p>
        {name} {exercises}
      </p>
    )
  }

  const Content = ({ course }) => {
    return (
      <div>
        {course.parts.map((c) => (
          <Part key={c.id} name={c.name} exercises={c.exercises} />
        ))}
      </div>
    )
  }

  const Total = ({ course }) => {
    const initialValue = 0
    const exercisesTotal = course.parts.reduce(
      (sum, part) => sum + part.exercises,
      initialValue,
    )
    return <p>total of exercises {exercisesTotal}</p>
  }

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default Course
