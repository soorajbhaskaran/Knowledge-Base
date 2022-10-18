# frozen_string_literal: true

FactoryBot.define do
  factory :article do
    title { Faker::Name.name[0..14] }
    content { Faker::Lorem.sentence[0..49] }
    association :author, factory: :user
    association :category, factory: :category
    status { "draft" }
  end
end
