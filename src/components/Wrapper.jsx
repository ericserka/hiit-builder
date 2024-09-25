import { useStore } from "../helpers/store"
import { Form } from "./Form"
import { Workout } from "./Workout"
import { PreWorkout } from "./PreWorkout"
import { PostWorkout } from "./PostWorkout"

export const Wrapper = () => {
  const mode = useStore(state => state.mode)

  switch (mode) {
    case "form":
      return <Form />
    case "preworkout":
      return <PreWorkout />
    case "workout":
      return <Workout />
    case "postworkout":
      return <PostWorkout />
  }
}
