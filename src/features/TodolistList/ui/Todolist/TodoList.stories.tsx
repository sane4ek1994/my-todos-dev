import type { Meta, StoryObj } from "@storybook/react";
import { TodoList } from "features/TodolistList/ui/Todolist/TodoList";
import { ReduxStoreProviderDecorator } from "stories/ReduxStoreProviderDecorator";
import { useSelector } from "react-redux";
import { TAppRootState } from "app/store";
import { TodolistDomainType } from "features/TodolistList/model/todolists/todolistsSlice";

const meta: Meta<typeof TodoList> = {
  title: "TODOLIST/TodoList",
  component: TodoList,
  decorators: [ReduxStoreProviderDecorator],
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TodoList>;

const TodoListWitchRedux = () => {
  const todolists = useSelector<TAppRootState, TodolistDomainType[]>(
    (state) => state.todolists
  );

  return (
    <>
      {todolists.map((todolist) => (
        <TodoList todolist={todolist} />
      ))}
    </>
  );
};

export const TodoListStory = {
  render: () => <TodoListWitchRedux />,
};
