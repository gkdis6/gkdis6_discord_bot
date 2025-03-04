import { expect } from 'chai';
import { saveCode, loadCode } from '../utils/notion.js';
import { describe, it, afterEach } from 'mocha';

describe('save & load code', function() {
	it('should save and load the code correctly', async function() {
		const code = new Date().toISOString();
		// 코드 저장
		await saveCode('test', code);
		// 저장한 코드 불러오기
		const loadedCode = await loadCode('test');
		// 저장한 값과 불러온 값이 동일한지 확인
		expect(loadedCode).to.equal(code);
	});
	
	afterEach(function() {
		// 테스트가 통과한 경우에만 로그 출력
		if (this.currentTest && this.currentTest.state === 'passed') {
			console.log(`${this.currentTest.title}: pass`);
		}
	});
});