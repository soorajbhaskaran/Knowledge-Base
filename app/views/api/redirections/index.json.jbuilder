# frozen_string_literal: true

json.redirections @redirections do |redirection|
  json.extract! redirection, :id, :from_path, :to_path
end
