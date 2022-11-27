  # frozen_string_literal: true

  json.versions @versions do |version|
    json.id version.id
    json.extract! version.reify, :restored_from, :status, :updated_at
  end
