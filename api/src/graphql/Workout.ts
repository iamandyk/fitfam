import { schema } from "nexus";

export const Workout = schema.objectType({
  name: "Workout",
  definition(t) {
    t.model.id();
    t.model.user();
    t.model.title();
    t.model.slug();
    t.model.logs({
      ordering: true,
    });
    t.model.createdAt();
    t.model.updatedAt();
  },
});

export const WorkoutSetsInput = schema.inputObjectType({
  name: "WorkoutSetsInput",
  definition(t) {
    t.id("logId");
    t.float("weight", {
      required: true,
    });
    t.int("reps", { required: true });
  },
});

export const WorkoutExerciseInput = schema.inputObjectType({
  name: "WorkoutExerciseInput",
  definition(t) {
    t.id("id", {
      required: true,
    });
    t.string("name");
    t.list.field("sets", {
      type: WorkoutSetsInput,
      required: true,
    });
  },
});

export const SaveWorkoutInput = schema.inputObjectType({
  name: "SaveWorkoutInput",
  definition(t) {
    t.id("workoutId");
    t.string("title", { required: true });
    t.int("volume");
    t.list.field("exercises", {
      type: WorkoutExerciseInput,
      required: true,
    });
    t.list.id("deleteLogs");
  },
});
