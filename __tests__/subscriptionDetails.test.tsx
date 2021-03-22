import React from "react"
import { render } from "@testing-library/react"
import { dataTestIds, SubscriptionDetails, Props } from "../components/subscriptionDetails"
import { subscriptionActiveMock, subscriptionTrialMock, subscriptionCanceledMock } from "./_mockSubscription"

const propsActive = {
  subscription: subscriptionActiveMock
} as Props

const propsTrial = {
  subscription: subscriptionTrialMock
} as Props

const propsCanceled = {
  subscription: subscriptionCanceledMock
} as Props

it("renders SubscriptionDetails", () => {
  const { getByTestId } = render(<SubscriptionDetails {...propsActive} />)
  expect(getByTestId(dataTestIds.container)).toBeInTheDocument()
})

it("renders the created date", () => {
  const { getAllByText } = render(<SubscriptionDetails {...propsActive} />)
  expect(getAllByText("Created at: Feb 28 2021").length).toEqual(1)
})

it("renders the amount with currency symbol and the cycle period", () => {
  const { getAllByText } = render(<SubscriptionDetails {...propsActive} />)
  expect(getAllByText("£10 / month").length).toEqual(1)
})

it("renders the status of the subscription", () => {
  const { getAllByText } = render(<SubscriptionDetails {...propsActive} />)
  expect(getAllByText("Status: active").length).toEqual(1)
})

// trial

it("renders the end of trial if subcription is in trial", () => {
  const { getAllByText } = render(<SubscriptionDetails {...propsTrial} />)
  expect(getAllByText("Trial ends at: Mar 30 2021").length).toEqual(1)
})

it("renders cancel button if subscription is in trial", () => {
  const { getByTestId } = render(<SubscriptionDetails {...propsTrial} />)
  expect(getByTestId(dataTestIds.cancelButton)).toBeInTheDocument()
})

// active

it("renders the next invoice date if subcription is active", () => {
  const { getAllByText } = render(<SubscriptionDetails {...propsActive} />)
  expect(getAllByText("Next invoice date: Mar 30 2021").length).toEqual(1)

})

it("renders cancel button if subscription is active", () => {
  const { getByTestId } = render(<SubscriptionDetails {...propsActive} />)
  expect(getByTestId(dataTestIds.cancelButton)).toBeInTheDocument()
})

// canceled

it("renders activate button if the subscription is canceled", () => {
  const { getByTestId } = render(<SubscriptionDetails {...propsCanceled} />)
  expect(getByTestId(dataTestIds.activateButton)).toBeInTheDocument()
})


it("doesn't render cancel button if the subscription is canceled", () => {
  const { queryByTestId } = render(<SubscriptionDetails {...propsCanceled} />)
  expect(queryByTestId(dataTestIds.cancelButton)).not.toBeInTheDocument()
})


