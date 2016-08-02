package jsondb;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.nio.ByteBuffer;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.BitSet;
import java.util.HashSet;
import java.util.UUID;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;
import java.util.zip.ZipOutputStream;

import org.apache.commons.codec.DecoderException;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.codec.binary.Hex;
import org.apache.commons.io.IOUtils;
import org.apache.commons.io.output.ByteArrayOutputStream;
import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.node.ArrayNode;
import org.codehaus.jackson.node.JsonNodeFactory;
import org.codehaus.jackson.node.ObjectNode;
import org.junit.Test;

public class SaveJson {

	String getid() {
		//return "43ec2a760cfe420a9c414f512c86e719";
		return UUID.randomUUID().toString().replaceAll("-", "");
	}

	String getid2() {
		byte[] bytes = UUID.randomUUID().toString().replaceAll("-", "").getBytes();
		String encodeBase64String = Base64.encodeBase64String(bytes);
		return encodeBase64String;
	}
	
	@Test
	public void xx() throws IOException {
		
		int testcount=30000;
		
		
		HashSet hs=new HashSet();
		
		
		
		BitSet set = new BitSet(testcount);
		StringBuilder sb=new StringBuilder();
		for(int i=0;i<testcount;i++)
		{
			int ret =  ((int)(Math.random()*testcount)%testcount);
			set.set(ret);
			sb.append(1);
		}
		
		byte[] byteArray = set.toByteArray();

		ByteArrayOutputStream zipBytes = getZipBytes(byteArray);
		
		String encodeHexString = Hex.encodeHexString(byteArray);
		System.out.println(encodeHexString);
		getZipBytes(encodeHexString.getBytes("utf-8"));
		
		System.out.println("sblength:"+sb.toString().length());
			
		
	}

	
	public void mytest() throws UnsupportedEncodingException, IOException, DecoderException {

		
		
		
		for (int i = 30000000; i < 30000000 + 2; i++) {
			byte[] bytes = ByteBuffer.allocate(4).putInt(i).array();
			char[] ret = Hex.encodeHex(bytes);
			System.out.println(ret);
			System.out.println(ret.length);

			byte[] decodeHex = Hex.decodeHex(ret);
			int int1 = ByteBuffer.wrap(decodeHex).getInt();
			System.out.println(int1);

		}

		for (int i = 30000000; i < 30000000 + 2; i++) {
			byte[] bytes = ByteBuffer.allocate(4).putInt(i).array();
			String ret = Base64.encodeBase64String(bytes);
			System.out.println(ret);
		}

		ObjectNode obj = JsonNodeFactory.instance.objectNode();
		ObjectNode devices = obj.putObject("devices");
		ArrayNode dev_keys = devices.putArray("keys");
		dev_keys.add("x");
		dev_keys.add("y");
		dev_keys.add("name");

		
		int count_device = 500;
		int count_link = 2000;
		int count_lsp = 32000;
		
		ArrayNode dev_data = devices.putArray("values");
		
		for (int i = 0; i < count_device; i++) {
			ObjectNode device = JsonNodeFactory.instance.objectNode();
			ArrayNode dev = JsonNodeFactory.instance.arrayNode();
			dev.add("100");
			dev.add("200");
			dev.add("NEName" + i);
			device.put(getid(), dev);
			dev_data.add(device);
		}
		

		ObjectNode links = obj.putObject("links");
		ArrayNode link_keys = links.putArray("keys");
		ArrayNode link_data = links.putArray("values");
		link_keys.add("srcneid");
		link_keys.add("snkneid");
		link_keys.add("name");
		link_keys.add("bu");

		for (int i = 0; i < count_link; i++) {
			ObjectNode link = JsonNodeFactory.instance.objectNode();
			ArrayNode link_d = JsonNodeFactory.instance.arrayNode();
			link_d.add(getid());
			link_d.add(getid());
			link_d.add("LinkName" + i);
			link_d.add(i);
			link.put(getid(), link_d);
			link_data.add(link);
		}

		

		ObjectNode lsps = obj.putObject("lsps");
		ArrayNode lsp_keys = lsps.putArray("keys");
		ObjectNode lsp_data = lsps.putObject("values");
		lsp_keys.add("srcneid");
		lsp_keys.add("snkneid");
		lsp_keys.add("tunnelid");
		
		for (int i = 0; i < count_lsp; i++) {
			ArrayNode lsp_d = JsonNodeFactory.instance.arrayNode();
			// lsp_d.add(getid());
			// lsp_d.add(getid());
			// lsp_d.add(getid());
			lsp_d.add(0);
			ArrayNode hotlist = lsp_d.addArray();
			for (int j = 0; j < 4; j++) {
//				 hotlist.add("123456788923423sdfsdf4234234234");
				 hotlist.add(getid());
			}

			lsp_data.put(getid(), lsp_d);
		}

		System.out.println(obj.toString().length());

		Path path = Paths.get("target/json.txt");
		Files.write(path, obj.toString().getBytes("utf-8"), java.nio.file.StandardOpenOption.TRUNCATE_EXISTING);

		byte[] readAllBytes = Files.readAllBytes(path);

		ObjectMapper om = new ObjectMapper();
		JsonNode readValue = om.readValue(readAllBytes, JsonNode.class);
		System.out.println(readValue.path("lsps").path("values").size());

		ByteArrayOutputStream out = getZipBytes(readAllBytes);

		byte[] byteArray = out.toByteArray();
		System.out.println("byteArray:"+byteArray.length);
		
		ByteArrayOutputStream out2 = getZipBytes(out.toByteArray());		
		byte[] byteArray2 = out2.toByteArray();
		System.out.println("byteArray2:"+byteArray2.length);

		ByteArrayOutputStream output = getUnzipBytes(out.toByteArray());
		System.out.println(output.toByteArray().length);


	}

	private ByteArrayOutputStream getZipBytes(byte[] readAllBytes) throws IOException {
		ZipEntry ze = new ZipEntry("xx");
		ByteArrayOutputStream out = new ByteArrayOutputStream();
		ZipOutputStream zos = new ZipOutputStream(out);
		zos.setLevel(9);
		zos.putNextEntry(ze);
		zos.write(readAllBytes);
		zos.close();
		System.out.println("zipsize:"+ze.getCompressedSize());
		System.out.println("orginsize:"+ze.getSize());
		return out;
	}
	
	private ByteArrayOutputStream getUnzipBytes(byte[] readAllBytes) throws IOException
	{
		InputStream in = new ByteArrayInputStream(readAllBytes);
		ZipInputStream zis = new ZipInputStream(in);
		ZipEntry ze = zis.getNextEntry();
		ByteArrayOutputStream output=new ByteArrayOutputStream();
		IOUtils.copy(zis, output);
		System.out.println("zipsize:"+ze.getCompressedSize());
		System.out.println("orginsize:"+ze.getSize());
		return output;
	}

}
