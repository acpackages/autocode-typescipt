import { parsePipeChain } from './ac-pipe-evaluator';

describe('ac-pipe-evaluator', () => {
  describe('parsePipeChain', () => {
    it('should split pipes normally', () => {
      const result = parsePipeChain('data | uppercase');
      expect(result.base).toBe('data');
      expect(result.pipes.length).toBe(1);
      expect(result.pipes[0].name).toBe('uppercase');
    });

    it('should NOT split on || (logical OR)', () => {
      const result = parsePipeChain('true || false');
      expect(result.base).toBe('true || false');
      expect(result.pipes.length).toBe(0);
    });

    it('should handle logical OR along with a valid pipe', () => {
      const result = parsePipeChain('data || fallback | uppercase');
      expect(result.base).toBe('data || fallback');
      expect(result.pipes.length).toBe(1);
      expect(result.pipes[0].name).toBe('uppercase');
    });

    it('should handle pipes with string arguments containing ||', () => {
      const result = parsePipeChain('data | default:"a||b"');
      expect(result.base).toBe('data');
      expect(result.pipes.length).toBe(1);
      expect(result.pipes[0].name).toBe('default');
      expect(result.pipes[0].args[0]).toBe('a||b');
    });

    it('should handle multiple logical OR operators', () => {
        const result = parsePipeChain('a || b || c | uppercase');
        expect(result.base).toBe('a || b || c');
        expect(result.pipes.length).toBe(1);
        expect(result.pipes[0].name).toBe('uppercase');
    });
  });
});
