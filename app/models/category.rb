# frozen_string_literal: true

class Category < ApplicationRecord
  default_scope { order("created_at") }
  has_many :articles, foreign_key: "category_id", class_name: "Article"

  validates :title, presence: true, uniqueness: true
end
