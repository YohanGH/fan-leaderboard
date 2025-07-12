import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Trophy, Star, TrendingUp, Award, Crown, Zap } from "lucide-react"
import { clubPools, poolRanking } from "@/data/pull"
import { useRole } from "@/hooks/useRole"

export function Dashboard() {
  const { user } = useRole();

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="px-1">
        <h1 className="text-2xl lg:text-3xl font-bold text-white">Chiliz Dashboard</h1>
        <p className="text-slate-400 mt-1 lg:mt-2 text-sm lg:text-base">Overview of your administration platform</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
        {/* My Score - Left */}
        {user?.score && (
          <Card className="bg-gradient-to-r from-slate-800 to-slate-700 border-slate-600">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 lg:w-5 lg:h-5 text-yellow-400" />
                  <CardTitle className="text-white text-base lg:text-lg">My Score</CardTitle>
                </div>
                <Badge className={`${user.role === 'admin' ? 'bg-orange-500' : 'bg-blue-500'} text-white text-xs`}>
                  {user.score.level}
                </Badge>
              </div>
              <p className="text-slate-400 text-xs lg:text-sm">Your performance on the platform</p>
            </CardHeader>
            <CardContent className="space-y-4 lg:space-y-6">
              <div className="grid grid-cols-3 gap-2 lg:gap-4">
                {/* Current Score */}
                <div className="text-center">
                  <div className="text-lg lg:text-2xl font-bold text-white mb-1">
                    {user.score.currentScore.toLocaleString()}
                  </div>
                  <div className="text-slate-400 text-xs lg:text-sm">Total Score</div>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-green-400" />
                    <span className="text-green-400 text-xs hidden sm:inline">+{user.score.weeklyChange} this week</span>
                    <span className="text-green-400 text-xs sm:hidden">+{user.score.weeklyChange}</span>
                  </div>
                </div>

                {/* Ranking */}
                <div className="text-center">
                  <div className="text-lg lg:text-2xl font-bold text-orange-400 mb-1">
                    #{user.score.rank}
                  </div>
                  <div className="text-slate-400 text-xs lg:text-sm">Ranking</div>
                  <div className="text-slate-500 text-xs mt-1 hidden sm:block">
                    out of {user.score.totalUsers.toLocaleString()} users
                  </div>
                  <div className="text-slate-500 text-xs mt-1 sm:hidden">
                    /{user.score.totalUsers.toLocaleString()}
                  </div>
                </div>

                {/* Progress to next level */}
                <div className="text-center">
                  <div className="text-lg lg:text-2xl font-bold text-blue-400 mb-1">
                    {Math.round((user.score.currentScore / user.score.nextLevelScore) * 100)}%
                  </div>
                  <div className="text-slate-400 text-xs lg:text-sm">Progress</div>
                  <div className="text-slate-500 text-xs mt-1 hidden sm:block">
                    to next level
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs lg:text-sm">
                  <span className="text-slate-400 hidden sm:inline">Progress to next level</span>
                  <span className="text-slate-400 sm:hidden">Next Level</span>
                  <span className="text-slate-300">
                    {user.score.currentScore.toLocaleString()} / {user.score.nextLevelScore.toLocaleString()}
                  </span>
                </div>
                <Progress 
                  value={(user.score.currentScore / user.score.nextLevelScore) * 100} 
                  className="h-2 lg:h-3"
                />
              </div>

              {/* Achievement Badges */}
              <div className="flex items-center gap-2 lg:gap-4 pt-3 lg:pt-4 border-t border-slate-600">
                <div className="flex items-center gap-1 lg:gap-2">
                  <Award className="w-3 h-3 lg:w-4 lg:h-4 text-yellow-400" />
                  <span className="text-slate-300 text-xs lg:text-sm">Level {user.score.level}</span>
                </div>
                <div className="flex items-center gap-1 lg:gap-2">
                  <Trophy className="w-3 h-3 lg:w-4 lg:h-4 text-orange-400" />
                  <span className="text-slate-300 text-xs lg:text-sm">Top {Math.round((user.score.rank / user.score.totalUsers) * 100)}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Pools in Progress - Right */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 lg:w-5 lg:h-5 text-yellow-400" />
              <CardTitle className="text-white text-base lg:text-lg">Ongoing Pools</CardTitle>
            </div>
            <p className="text-slate-400 text-xs lg:text-sm">Liquidity pools currently running</p>
          </CardHeader>
          <CardContent className="space-y-3 lg:space-y-4">
            {clubPools.map((pool) => {
              const start = new Date(pool.start).getTime();
              const end = new Date(pool.end).getTime();
              const progress = Math.min(100, Math.max(0, Math.round(((Date.now() - start) / (end - start)) * 100)));
              return (
                <div key={pool.id} className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="text-white text-sm lg:text-base truncate">{pool.name}</span>
                    <Badge className={pool.status === 'Ongoing' ? 'bg-green-600 text-white' : 'bg-slate-600 text-white'}>
                      {pool.status}
                    </Badge>
                  </div>
                  <div className="text-slate-400 text-xs">
                    {pool.start} → {pool.end}
                  </div>
                  <Progress value={progress} className="h-1" />
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

        {/* Pool Leaderboard - Full Table */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 lg:w-5 lg:h-5 text-cyan-400" />
                <CardTitle className="text-white text-base lg:text-lg">Pool Leaderboard</CardTitle>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-cyan-500 text-white text-xs">Real-time</Badge>
                <Badge variant="outline" className="border-slate-600 text-slate-300 text-xs">
                  Top 10
                </Badge>
              </div>
            </div>
            <p className="text-slate-400 text-xs lg:text-sm">Top participants in the current pool</p>
          </CardHeader>
          <CardContent>
            {/* Mobile View */}
            <div className="block lg:hidden space-y-3">
              {poolRanking.slice(0, 5).map((u, i) => (
                <div key={u.id} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400 font-medium text-sm">#{i + 1}</span>
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-slate-600 text-white text-xs">
                        {u.username.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-white font-medium text-sm">{u.username}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-medium text-sm">{u.points}</div>
                    <div className="text-slate-400 text-xs">pts</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700">
                    <TableHead className="text-slate-400 font-medium">Rank</TableHead>
                    <TableHead className="text-slate-400 font-medium">Name</TableHead>
                    <TableHead className="text-slate-400 font-medium">Yaps</TableHead>
                    <TableHead className="text-slate-400 font-medium">Points</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {poolRanking.map((u, i) => (
                    <TableRow key={u.id} className="border-slate-700 hover:bg-slate-700/50">
                      <TableCell className="text-slate-400 font-medium">#{i + 1}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-slate-600 text-white text-sm">
                              {u.username.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="text-white font-medium">{u.username}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-white">{u.yaps}</TableCell>
                      <TableCell className="text-white">{u.points}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
    </div>
  )
}
