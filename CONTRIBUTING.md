# Guidelines

## Branch Strategy

- `main`: production branch
- `dev`: integration branch
- `feature/<feature-name>`: individual feature development

## Commit Messages

- `feat`: new feature
- `fix`: bug fix
- `chore`: configuration, documentation, build related
- `refactor`: code refactoring without changing functionality
- `test`: adding or modifying tests
- `docs`: documentation changes
- `perf`: performance improvements
- `style`: code style or formatting changes (no functional changes)

## File Naming

### Frontend

- Components: PascalCase (e.g., `InvoiceCard.jsx`)
- Utils/Functions: camelCase (e.g., `calculateTax.js`)
- CSS/Tailwind: utility classes; No inline styles

### Backend

- Controllers: PascalCase (e.g., `UserController.js`)
- Routes: camelCase (e.g., `userRoutes.js`)
- Models / Schemas: PascalCase (e.g., `InvoiceModel.js`)
- Utils / Helpers: camelCase (e.g., `calculateTax.js`)

## Styling

- Use Tailwind CSS utility classes
- Avoid inline styles unless necessary
- Maintain consistency in spacing, typography, and colors according to design guidelines

## Code Style

- ESLint + Prettier enforced
- 2 spaces indentation, semicolons required
- Consistent use of quotes and semicolons

## Pull Request

- Split PRs by feature.
- Team members create PRs to the `dev` branch after ensuring all tests pass.
- Team lead reviews and approves PRs before merging.

## Testing

- Write tests for new features when applicable
- Ensure all existing tests pass before merging
