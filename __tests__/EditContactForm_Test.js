// ...
import { render, act, fireEvent } from 'react-native-testing-library'
// ...
it ('creates VALIDATION INPUT on Save Contact page to before fetching', () => {
  const mock = jest.fn()
  const component = render(<Search 
    onChangeFirstname={mock}/>
  )
  fireEvent.changeText(component.findByType(TextInput), 'test')
  expect(mock).toHaveBeenCalledWith('test')

  component = render(<Search 
    onChangeLastname={mock}/>
  )
  fireEvent.changeText(component.findByType(TextInput), 'test')
  expect(mock).toHaveBeenCalledWith('test')

  component = render(<Search 
    onChangeAge={mock}/>
  )
  fireEvent.changeText(component.findByType(TextInput), '20')
  expect(mock).toHaveBeenCalledWith('20')

  component = render(<Search 
    onChangePhoto={mock}/>
  )
  fireEvent.changeText(component.findByType(TextInput), 'someurl')
  expect(mock).toHaveBeenCalledWith('someurl')
})
