# frozen_string_literal: true

class AddStatusToSchedule < ActiveRecord::Migration[6.1]
  def change
    add_column :schedules, :status, :string
  end
end
