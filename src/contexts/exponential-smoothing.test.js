import {
  SimpleExponentialSmoothing,
  HoltSmoothing,
  HoltWintersSmoothing,
} from "./exponential-smoothing";

test("simple prediction with empty data, throws error", () => {
  let data = [];
  try {
    let simpleExp = new SimpleExponentialSmoothing(data, 0.5);
  } catch (error) {
    expect(
      error.message === "data doesn't contain enough data to make a prediction"
    );
  }
});

test("double prediction with empty data, throws error", () => {
  let data = [];
  try {
    let doubleExp = new HoltSmoothing(data, 0.5, 0.5);
  } catch (error) {
    expect(
      error.message === "data doesn't contain enough data to make a prediction"
    );
  }
});

test("triple prediction with empty data, throws error", () => {
  let data = [];
  try {
    let tripleExp = new HoltWintersSmoothing(data, 0.5, 0.5, 0.5);
  } catch (error) {
    expect(
      error.message === "data doesn't contain enough data to make a prediction"
    );
  }
});

test("simple prediction with parameter is < 0 or > 1, throws error", () => {
  let data = [1, 2, 3];
  try {
    let simpleExp = new SimpleExponentialSmoothing(data, -0.5);
  } catch (error) {
    expect(error.message === "alpha parameter must be between 0 and 1");
  }
});

test("double prediction with parameter is < 0 or > 1, throws error", () => {
  let data = [1, 2, 3];
  try {
    let doubleExp = new HoltSmoothing(data, 0.5, -0.5);
  } catch (error) {
    expect(error.message === "gamma parameter must be between 0 and 1");
  }
});

test("triple prediction with parameter is < 0 or > 1, throws error", () => {
  let data = [1, 2, 3];
  try {
    let tripleExp = new HoltWintersSmoothing(data, -0.5, 0.5, 0.5, 2);
  } catch (error) {
    expect(error.message === "alpha parameter must be between 0 and 1");
  }
});
