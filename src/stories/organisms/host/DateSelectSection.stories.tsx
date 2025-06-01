import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { DateSelectSection } from "../../../components/organisms/host/DateSelectSection";

const meta = {
  title: "Components/Organisms/DateSelectSection",
  component: DateSelectSection,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof DateSelectSection>;

export default meta;
type Story = StoryObj<typeof DateSelectSection>;

export const Default: Story = {
  render: () => {
    const [selectedDays, setSelectedDays] = useState<Date[]>([new Date()]);
    const [month, setMonth] = useState<Date>(new Date());
    const [weekdayToggles, setWeekdayToggles] = useState([
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ]);
    const [allDaysToggled, setAllDaysToggled] = useState(false);
    const [showBatchSelect, setShowBatchSelect] = useState(false);
    const goPrevMonth = () =>
      setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1));
    const goNextMonth = () =>
      setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1));
    const toggleWeekdayButton = (idx: number) => {
      const newToggles = [...weekdayToggles];
      newToggles[idx] = !newToggles[idx];
      setWeekdayToggles(newToggles);
    };
    const toggleAllDaysInMonth = () => setAllDaysToggled((prev) => !prev);
    const error = "";
    return (
      <DateSelectSection
        selectedDays={selectedDays}
        setSelectedDays={setSelectedDays}
        month={month}
        setMonth={setMonth}
        weekdayToggles={weekdayToggles}
        toggleWeekdayButton={toggleWeekdayButton}
        allDaysToggled={allDaysToggled}
        toggleAllDaysInMonth={toggleAllDaysInMonth}
        showBatchSelect={showBatchSelect}
        setShowBatchSelect={setShowBatchSelect}
        goPrevMonth={goPrevMonth}
        goNextMonth={goNextMonth}
        error={error}
      />
    );
  },
};
