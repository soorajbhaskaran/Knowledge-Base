# frozen_string_literal: true

json.categories @categories do |category|
  json.extract! category, :id,:title,:articles_count
end
