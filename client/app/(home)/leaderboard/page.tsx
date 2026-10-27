"use client";
import { useEffect, useMemo } from "react";
import {
  Trophy,
  Medal,
} from "lucide-react";

// import { useLeaderboard } from "@/src/hooks/space/useSpacehooks";
import getTier from "@/src/components/LeaderBoardPage/GetTier";
import PodiumSpot from "@/src/components/LeaderBoardPage/PodiumSpot";
import Avatar from "@/src/components/LeaderBoardPage/Avtar";
import RankMovement from "@/src/components/LeaderBoardPage/RankMovement";

export interface LeaderboardUser {
  rank: number;
  id: string;
  name: string;
  college: string;
  profilePhoto?: string | null;
  impactPoints: number;
}

interface CurrentUser {
  id: string;
  rank: number;
  impactPoints: number;
  pointsToNextRank: number;
}

interface LeaderboardResponse {
  success: boolean;
  leaderboard: LeaderboardUser[];
  currentUser: CurrentUser | null;
}

const demoLeaderboard: LeaderboardUser[] = [
  { rank: 1, id: "u1", name: "Priya Sharma", college: "Institute of Hotel Management", profilePhoto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80", impactPoints: 980 },
  { rank: 2, id: "u2", name: "Vihan Patel", college: "School of Hospitality", profilePhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80", impactPoints: 925 },
  { rank: 3, id: "u3", name: "Mira Nair", college: "Culinary Arts Academy", profilePhoto: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=200&q=80", impactPoints: 910 },
  { rank: 4, id: "u4", name: "Aarav Singh", college: "Global Hotel School", profilePhoto: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80", impactPoints: 870 },
  { rank: 5, id: "u5", name: "Sara Ali", college: "Leisure Management College", profilePhoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80", impactPoints: 845 },
  { rank: 6, id: "u6", name: "Kabir Mehta", college: "Hospitality Business Institute", profilePhoto: "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=200&q=80", impactPoints: 820 },
  { rank: 7, id: "u7", name: "Tanya Verma", college: "City Hotel Academy", profilePhoto: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80", impactPoints: 794 },
  { rank: 8, id: "u8", name: "Rohan Das", college: "Hospitality & Tourism School", profilePhoto: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80", impactPoints: 780 },
  { rank: 9, id: "u9", name: "Nisha Kulkarni", college: "Service Excellence Institute", profilePhoto: "https://images.unsplash.com/photo-1542131596-dea4e6d9a92d?auto=format&fit=crop&w=200&q=80", impactPoints: 760 },
  { rank: 10, id: "u10", name: "Dev Kapoor", college: "Premier Hotel Studies", profilePhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80", impactPoints: 734 },
];

const demoCurrentUser: CurrentUser = {
  id: "u7",
  rank: 7,
  impactPoints: 794,
  pointsToNextRank: 26,
};

export default function LeaderboardPage() {
  /*
  const {
    data,
    isLoading,
    isError,
  } = useLeaderboard();

  const leaderboardData = data as LeaderboardResponse | undefined;

  const leaderboard = useMemo(
    () => leaderboardData?.leaderboard ?? [],
    [leaderboardData]
  );

  const currentUser = leaderboardData?.currentUser ?? null;

  const podium = leaderboard.slice(0, 3);

  const isCurrentUserOutsideTop =
    currentUser !== null &&
    currentUser.rank > leaderboard.length;

  useEffect(() => {
  }, []);
  */

  const leaderboard = demoLeaderboard;
  const currentUser = demoCurrentUser;
  const podium = leaderboard.slice(0, 3);
  const isCurrentUserOutsideTop = currentUser.rank > leaderboard.length;
  const isLoading = false;
  const isError = false;

  useEffect(() => {
    // Demo data is being shown intentionally while backend data is unavailable.
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--app-background)] px-4 py-8 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl">

          <div className="h-7 w-40 animate-pulse rounded bg-[var(--app-surface-2)]" />

          <div className="mt-5 h-[430px] animate-pulse rounded-3xl bg-[var(--app-surface)]" />

          <div className="mt-6 space-y-2">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="h-16 animate-pulse rounded-2xl bg-[var(--app-surface)]"
              />
            ))}
          </div>

        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--app-background)] px-4">
        <div className="text-center">

          <Trophy
            size={40}
            className="mx-auto text-[var(--app-text-muted)]"
          />

          <h2 className="mt-3 text-lg font-semibold">
            Failed to load leaderboard
          </h2>

          <p className="mt-1 text-sm text-[var(--app-text-muted)]">
            Please try again later.
          </p>

        </div>
      </div>
    );
  }

  if (!leaderboard.length) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--app-background)] px-4">
        <div className="text-center">

          <Trophy
            size={40}
            className="mx-auto text-[var(--app-text-muted)]"
          />

          <h2 className="mt-3 text-lg font-semibold">
            No leaderboard data yet
          </h2>

          <p className="mt-1 text-sm text-[var(--app-text-muted)]">
            Start building impact to appear here.
          </p>

        </div>
      </div>
    );
  }

  const currentTier = currentUser
    ? getTier(currentUser.impactPoints)
    : null;

  return (
    <div className="min-h-screen bg-[var(--app-background)] px-4 py-8 text-[var(--app-text-primary)] sm:px-6 lg:px-10">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1fr_320px]">

        <div className="min-w-0">

          {/* Header */}
          <div className="flex items-center gap-2">
            <Trophy
              size={20}
              className="text-[var(--app-primary)]"
            />

            <h1 className="text-xl font-semibold">
              Impact Leaderboard
            </h1>
          </div>

          <p className="mt-1 text-sm text-[var(--app-text-muted)]">
            Students ranked by their total impact points.
          </p>

          {/*PODIUM */}

          {podium.length >= 3 && (
            <div className="mt-5 rounded-3xl border border-[var(--app-border)] bg-[var(--app-surface)] p-4 sm:p-5">

              <div className="flex items-center justify-between">

                <div>
                  <h2 className="text-sm font-semibold">
                    Top performers
                  </h2>

                  <p className="mt-0.5 text-xs text-[var(--app-text-muted)]">
                    Based on total impact points
                  </p>
                </div>

                <div className="rounded-full bg-[var(--app-background)] px-3 py-1.5 text-xs font-medium text-[var(--app-text-secondary)]">
                  Overall
                </div>

              </div>

              <div className="mt-10 flex items-end justify-center gap-2 pb-2 sm:gap-6">

                <PodiumSpot
                  user={podium[1]}
                  place={2}
                />

                <PodiumSpot
                  user={podium[0]}
                  place={1}
                />

                <PodiumSpot
                  user={podium[2]}
                  place={3}
                />

              </div>
            </div>
          )}

          {/*TOP 10*/}

          <div className="mt-6">

            <div className="mb-3 flex items-center justify-between">

              <div>
                <h2 className="text-sm font-semibold">
                  Top 10
                </h2>

                <p className="text-xs text-[var(--app-text-muted)]">
                  Students with the highest impact points
                </p>
              </div>

            </div>

            <div className="space-y-2">

              {leaderboard.map((user) => {
                const tier = getTier(
                  user.impactPoints
                );

                /*
                 * IMPORTANT:
                 * Compare IDs instead of ranks.
                 */
                const isCurrentUser =
                  currentUser?.id === user.id;

                return (
                  <div
                    key={user.id}
                    className={`flex items-center gap-3 rounded-2xl border px-3 py-3 transition-colors sm:gap-4 sm:px-4 ${
                      isCurrentUser
                        ? "border-[var(--app-primary)] bg-[var(--app-primary-soft)]"
                        : "border-[var(--app-border)] bg-[var(--app-surface)]"
                    }`}
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--app-surface-2)] text-xs font-semibold tabular-nums">
                      {user.rank}
                    </span>

                    <Avatar
                      user={user}
                      size={40}
                    />

                    <div className="min-w-0 flex-1">

                      <div className="flex items-center gap-2">

                        <div className="truncate text-sm font-medium">
                          {user.name}
                        </div>

                        {isCurrentUser && (
                          <span className="shrink-0 rounded-full bg-[var(--app-primary)] px-2 py-0.5 text-[10px] font-semibold text-[#0F1720]">
                            You
                          </span>
                        )}

                      </div>

                      <div className="truncate text-xs text-[var(--app-text-muted)]">
                        {user.college}
                      </div>

                    </div>

                    <div
                      className="hidden shrink-0 items-center gap-1.5 text-xs font-medium sm:flex sm:w-24"
                      style={{
                        color: tier.color,
                      }}
                    >
                      <Medal size={16} />
                      {tier.label}
                    </div>

                    <div className="hidden w-12 shrink-0 sm:block">
                      <RankMovement
                        rank={user.rank}
                      />
                    </div>

                    <div className="shrink-0 text-right">

                      <div className="text-sm font-semibold tabular-nums">
                        {user.impactPoints.toLocaleString()}
                      </div>

                      <div className="text-xs text-[var(--app-text-muted)]">
                        impact pts
                      </div>

                    </div>

                  </div>
                );
              })}

            </div>

            {isCurrentUserOutsideTop &&
              currentUser && (
                <div className="mt-4 overflow-hidden rounded-2xl border border-[var(--app-primary)] bg-[var(--app-primary-soft)]">

                  <div className="p-4">

                    <div className="flex items-center gap-3">

                      {/* Rank */}
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--app-primary)] text-sm font-bold text-[#0F1720]">
                        #{currentUser.rank}
                      </div>

                      {/* User */}
                      <div className="min-w-0 flex-1">

                        <div className="flex items-center gap-2">

                          <p className="text-sm font-semibold text-[var(--app-text-primary)]">
                            Your Position
                          </p>

                          <span className="rounded-full bg-[var(--app-primary)] px-2 py-0.5 text-[10px] font-semibold text-[#0F1720]">
                            You
                          </span>

                        </div>

                        <p className="mt-0.5 text-xs text-[var(--app-text-muted)]">
                          Currently ranked #{currentUser.rank}
                        </p>

                      </div>

                      <div
                        className="hidden items-center gap-1.5 text-xs font-medium sm:flex"
                        style={{
                          color: currentTier?.color,
                        }}
                      >
                        <Medal size={15} />
                        {currentTier?.label}
                      </div>

                      <div className="shrink-0 text-right">

                        <div className="text-sm font-bold tabular-nums text-[var(--app-text-primary)]">
                          {currentUser.impactPoints.toLocaleString()}
                        </div>

                        <div className="text-xs text-[var(--app-text-muted)]">
                          impact pts
                        </div>

                      </div>

                    </div>

                    {currentUser.rank > 1 && (
                      <div className="mt-3 rounded-xl bg-[var(--app-background)] px-3 py-2.5">

                        <p className="text-xs text-[var(--app-text-secondary)]">

                          <span className="font-semibold text-[var(--app-primary)]">
                            {currentUser.pointsToNextRank} points
                          </span>{" "}

                          needed to reach #

                          {currentUser.rank - 1}

                        </p>

                      </div>
                    )}

                  </div>
                </div>
              )}

            {/*CURRENT USER ALREADY IN TOP 10*/}

            {currentUser &&
              currentUser.rank <= leaderboard.length && (
                <div className="mt-3 flex items-center gap-2 rounded-xl bg-[var(--app-primary-soft)] px-3 py-2">

                  <div className="h-2 w-2 shrink-0 rounded-full bg-[var(--app-primary)]" />

                  <p className="text-xs text-[var(--app-text-secondary)]">
                    You are currently ranked #
                    {currentUser.rank} and are shown above.
                  </p>

                </div>
              )}

          </div>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-8 lg:self-start">

          {/*CURRENT USER */}

          {currentUser && currentTier && (
            <div className="rounded-3xl border border-[var(--app-border)] bg-[var(--app-surface)] p-5">

              <div className="flex flex-col items-center text-center">

                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--app-primary-soft)]">

                  <Trophy
                    size={32}
                    className="text-[var(--app-primary)]"
                  />

                </div>

                <div className="mt-3 text-base font-semibold">
                  Your Impact
                </div>

                <span
                  className="mt-2 rounded-full px-2 py-0.5 text-[10px] font-semibold"
                  style={{
                    backgroundColor: `${currentTier.color}22`,
                    color: currentTier.color,
                  }}
                >
                  {currentTier.label}
                </span>

              </div>

              {/* Stats */}
              <div className="mt-5 grid grid-cols-2 gap-2">

                <div className="rounded-xl bg-[var(--app-surface-2)] px-3 py-2.5 text-center">

                  <div className="text-lg font-bold tabular-nums">
                    #{currentUser.rank}
                  </div>

                  <div className="text-[11px] text-[var(--app-text-muted)]">
                    Rank
                  </div>

                </div>

                <div className="rounded-xl bg-[var(--app-surface-2)] px-3 py-2.5 text-center">

                  <div className="text-lg font-bold tabular-nums">
                    {currentUser.impactPoints.toLocaleString()}
                  </div>

                  <div className="text-[11px] text-[var(--app-text-muted)]">
                    Impact
                  </div>

                </div>

              </div>

              {/* Next rank */}
              {currentUser.rank > 1 && (
                <div className="mt-4 rounded-xl border border-[var(--app-primary-border)] bg-[var(--app-primary-soft)] px-3 py-2.5">

                  <p className="text-xs text-[var(--app-text-secondary)]">

                    <span className="font-semibold text-[var(--app-primary)]">
                      {currentUser.pointsToNextRank} points
                    </span>{" "}

                    to reach #

                    {currentUser.rank - 1}

                  </p>

                </div>
              )}

            </div>
          )}

              {/* HOW IMPACT WORKS */}

          <div className="rounded-3xl border border-[var(--app-border)] bg-[var(--app-surface)] p-5">

            <h2 className="text-sm font-semibold">
              How Impact Points work
            </h2>

            <div className="mt-4 space-y-3">

              <div className="rounded-2xl bg-[var(--app-surface-2)] p-3">

                <div className="text-xs font-semibold">
                  Build projects
                </div>

                <p className="mt-1 text-[11px] leading-snug text-[var(--app-text-muted)]">
                  Meaningful project activity contributes to your
                  overall impact.
                </p>

              </div>

              <div className="rounded-2xl bg-[var(--app-surface-2)] p-3">

                <div className="text-xs font-semibold">
                  Participate
                </div>

                <p className="mt-1 text-[11px] leading-snug text-[var(--app-text-muted)]">
                  Your meaningful activities and contributions help
                  build your impact score.
                </p>

              </div>

              <div className="rounded-2xl bg-[var(--app-surface-2)] p-3">

                <div className="text-xs font-semibold">
                  Create value
                </div>

                <p className="mt-1 text-[11px] leading-snug text-[var(--app-text-muted)]">
                  Impact points reflect contribution across the
                  platform.
                </p>

              </div>

            </div>
          </div>

        </aside>
      </div>
    </div>
  );
}