json.schedules.where(executed: false) do |schedule|
    json.extract! schedule, :id, :scheduled_at
end
