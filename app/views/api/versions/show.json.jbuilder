json.version do
  json.extract! @version.reify, :title, :content
  json.category @version.reify.category
end
