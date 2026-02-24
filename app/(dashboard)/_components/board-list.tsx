"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

import { EmptyBoards } from "./empty-boards";
import { EmptyFavorites } from "./empty-favorites";
import { EmptySearch } from "./empty-search";
import { BoardCard } from "./board-card";
import { NewBoardButton } from "./new-board-button";

interface BoardListProps {
  orgId: string;
  query: {
    search?: string;
    favorites?: string;
  };
}

export const BoardList = ({ orgId, query }: BoardListProps) => {
  const data = useQuery(api.boards.get, {
    orgId,
    ...query,
  });

  if (data === undefined) {
    return (
      <div className="flex flex-col h-full w-full space-y-6">
        <div className="flex flex-col space-y-1.5">
          <h2 className="text-3xl font-semibold tracking-tight text-neutral-800 dark:text-neutral-100">
            {query.favorites ? "Favorite Boards" : "Team Boards"}
          </h2>
          <p className="text-sm text-neutral-500">
            {query.favorites
              ? "View all your starred boards in one place"
              : "Collaborate with your team on these boards"}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 pb-10">
          <NewBoardButton orgId={orgId} disabled />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
        </div>
      </div>
    );
  }

  if (!data?.length && query.search) {
    return <EmptySearch />;
  }

  if (!data?.length && query.favorites) {
    return <EmptyFavorites />;
  }

  if (!data?.length) {
    return <EmptyBoards />;
  }

  return (
    <div className="flex flex-col h-full w-full space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-in-out">
      <div className="flex flex-col space-y-1.5">
        <h2 className="text-3xl font-semibold tracking-tight text-neutral-800 dark:text-neutral-100">
          {query.favorites ? "Favorite Boards" : "Team Boards"}
        </h2>
        <p className="text-sm text-neutral-500">
          {query.favorites
            ? "View all your starred boards in one place"
            : "Collaborate with your team on these boards"}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 pb-10">
        <NewBoardButton orgId={orgId} />

        {data.map((board) => (
          <BoardCard
            key={board._id}
            id={board._id}
            title={board.title}
            imageUrl={board.imageUrl}
            authorId={board.authorId}
            authorName={board.authornName}
            createdAt={board._creationTime}
            orgId={board.orgId}
            isFavorite={board.isFavorite}
          />
        ))}
      </div>
    </div>
  );
};
