# frozen_string_literal: true

class User < ApplicationRecord
  has_many :articles, foreign_key: "author_id", class_name: "Article"
  has_many :categories, foreign_key: "author_id", class_name: "Category"
  has_many :redirections, foreign_key: "author_id", class_name: "Redirection"
  belongs_to :organization, class_name: "Organization", foreign_key: "organization_id"
end
