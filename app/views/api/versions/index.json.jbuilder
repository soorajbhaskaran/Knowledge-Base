  # frozen_string_literal: true

  json.versions @versions.unscope(:order).order(created_at: :desc) do |version|
    json.id version.id
    json.extract! version.reify, :restored_from_timestamp, :status, :updated_at
  end
