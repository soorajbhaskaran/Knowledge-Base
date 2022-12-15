# frozen_string_literal: true

class User < ApplicationRecord
  has_many :articles, foreign_key: "author_id", dependent: :destroy
  has_many :categories, foreign_key: "author_id", dependent: :destroy
  has_many :redirections
  belongs_to :organization
end
