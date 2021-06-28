import { useStateSelector } from "../utils/useStateSelector"
import { useSelector } from "react-redux"
import store from "../state/store"

const mockUseSelector = jest.fn(() => {})

jest.mock('react-redux', () => ({
  useSelector: () => mockUseSelector()
}));

it("returns the state for provided key", () => {
  mockUseSelector.mockImplementation(() => ({
    stateKey: "state value"
  }))

  const state = useStateSelector("testKey")

  expect(mockUseSelector).toBeCalledTimes(1)
  expect(state.stateKey).toBe("state value")
})
