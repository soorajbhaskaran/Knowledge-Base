# frozen_string_literal: true

json.version do
  json.extract! @version.reify, :title, :content, :restored_from
  json.category @version.reify.category
end
