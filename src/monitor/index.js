import { injectJsError } from './lib/jsError';
import { injectXHR } from './lib/xhr';
import { blankScreen } from './lib/blankScreen';
import { timing } from './lib/timing';

injectJsError();
injectXHR();
blankScreen();
timing();

/**
 *  kind            监控指标大类
 *  type            小类型
 *  errorType       js错误类型，比如 'jsError'    
 *  url
 *  message         错误信息
 *  filename        错误的文件名
 *  position        错误的位置
 *  stack           错误堆栈信息
 *  
 */ 