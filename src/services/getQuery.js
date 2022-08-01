const getQuery = ({
  pagination = { page: 1, perPage: 12 },
  filter = {},
  sort,
  ...rest
}) => {
  const { page, per_page } = pagination
  const query = {
    page,
    per_page,
    q: {
      ...filter,
      s: 'created_at desc'
    },
    ...rest
  }

  if (sort) query.q.s = `${sort.field} ${sort.order}`

  return query
}

export default getQuery
