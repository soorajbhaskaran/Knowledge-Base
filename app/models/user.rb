# frozen_string_literal: true

class User < ApplicationRecord
  has_many :articles, foreign_key: "author_id"
  has_many :categories, foreign_key: "author_id"
  has_many :redirections
  belongs_to :organization
end
