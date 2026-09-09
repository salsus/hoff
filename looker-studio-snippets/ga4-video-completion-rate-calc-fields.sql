video_completes
CASE WHEN Event name = "video_complete" THEN 1 ELSE 0 END


video_starts
CASE WHEN Event name = "video_start" THEN 1 ELSE 0 END


Video Completion Rate
SUM(video_completes) / SUM(video_starts)
