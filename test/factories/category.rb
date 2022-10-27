# frozen_string_literal: true

FactoryBot.define do
  factory :category do
    title { Faker::Name.name[0..14] }
    association :author, factory: :user
  end
end
