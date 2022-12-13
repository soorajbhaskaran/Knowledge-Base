# frozen_string_literal: true

class AddQueuedToSchedule < ActiveRecord::Migration[6.1]
  def change
    add_column :schedules, :queued, :boolean, default: false
  end
end
