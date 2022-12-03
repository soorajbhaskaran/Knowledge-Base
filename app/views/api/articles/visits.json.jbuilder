# frozen_string_literal: true

json.visits @visits do |visit|
  json.extract! visit, :created_at, :count
end
