const Course = ({ course }) => {
  const Header = ({ parts }) => <h1>{parts.name}</h1>

  const Part = ({ name, exercises }) => {
    return (
      <p>
        {name} {exercises}
      </p>
    )
  }

  const Content = ({ parts }) => {
    const courseList = parts.map((part) => {
      return <Part key={part.id} name={part.name} exercises={part.exercises} />
    })

    return <div>{courseList}</div>
  }

  const Total = ({ parts }) => {
    const initialValue = 0
    const exercisesTotal = parts.reduce(
      (sum, part) => sum + part.exercises,
      initialValue
    )
    return <b>total of exercises {exercisesTotal}</b>
  }

  return (
    <div>
      <Header parts={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course
