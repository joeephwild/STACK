/**
 * @jest-environment jsdom
 */

describe('UI Library', () => {
  it('should be defined', () => {
    // Simple test to verify the test setup works
    expect(true).toBe(true);
  });

  it('should have proper package structure', () => {
    // Test that the package exports exist
    const fs = require('fs');
    const path = require('path');
    
    const packageJsonPath = path.join(__dirname, '..', 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    expect(packageJson.name).toBe('@stack/ui-library');
    expect(packageJson.main).toBe('./dist/index.js');
    expect(packageJson.types).toBe('./dist/index.d.ts');
  });

  it('should have Button component file', () => {
    const fs = require('fs');
    const path = require('path');
    
    const buttonPath = path.join(__dirname, '..', 'src', 'components', 'Button.tsx');
    expect(fs.existsSync(buttonPath)).toBe(true);
  });

  it('should have index file', () => {
    const fs = require('fs');
    const path = require('path');
    
    const indexPath = path.join(__dirname, '..', 'src', 'index.ts');
    expect(fs.existsSync(indexPath)).toBe(true);
  });
});