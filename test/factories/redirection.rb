# frozen_string_literal: true

FactoryBot.define do
  factory :redirection do
    from_path { Faker::Internet.slug }
    to_path { Faker::Internet.slug }
    association :author, factory: :user
  end
end
