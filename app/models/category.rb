# frozen_string_literal: true

class Category < ApplicationRecord
  has_many :articles, foreign_key: "category_id", class_name: "Article"
end
