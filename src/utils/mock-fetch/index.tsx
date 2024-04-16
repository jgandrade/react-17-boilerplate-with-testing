export function mockFetch(data: any) {
    return jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () =>  data,
      }),
    )
  }